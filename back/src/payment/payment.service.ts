import { Donation, DonationStatus, User } from '@prisma/client';
import { PaymentData } from 'src/donations/types/payment-data';
import { api } from 'src/lib/api';

export default class PaymentService {
  async process(
    user: User,
    donation: Donation,
    payment: PaymentData,
  ): Promise<{ transactionId: string; status: DonationStatus }> {
    try {
      const userId = await this.createUser(user);
      const transaction = await this.createTransaction(
        userId,
        donation,
        user,
        payment,
      );

      return {
        transactionId: transaction.transactionId,
        status: DonationStatus.PAID,
      };
    } catch (error) {
      return {
        transactionId: '',
        status: DonationStatus.CANCELED,
      };
    }
  }

  private async createUser(user: User): Promise<string> {
    const userResponse = await api.get(`/users?email=${user.email}`);

    if (userResponse.data?.data?.lenght > 0) {
      return userResponse.data?.data[0]?.id;
    }

    const userParams = {
      name: user.user,
      email: user.email,
      mobilePhone: user.mobile,
      cpfCnpj: user.document,
      postalCode: user.zipCode,
      address: user.street,
      addressNumber: user.number,
      complement: user.complement,
      province: user.neighborhood,
      notificationDisabled: true,
    };

    const response = await api.post('/users', userParams);

    return response.data?.id;
  }

  private async createTransaction(
    userId: string,
    donation: Donation,
    user: User,
    payment: PaymentData,
  ): Promise<{
    transactionId: string;
    gatewayStatus: string;
  }> {
    const paymentParams = {
      user: userId,
      billingType: 'CREDIT_CARD',
      dueDate: new Date().toISOString(),
      value: donation.total,
      description: `Pedido #${donation.id}`,
      externalReference: donation.id.toString(),
      creditCard: {
        holderName: payment.creditCardHolder,
        number: payment.creditCardNumber,
        expiryMonth: payment.creditCardExpiration?.split('/')[0],
        expiryYear: payment.creditCardExpiration?.split('/')[1],
        ccv: payment.creditCardSecurityCode,
      },
      creditCardHolderInfo: {
        name: user.user,
        email: user.email,
        cpfCnpj: user.document,
        postalCode: user.zipCode,
        addressNumber: user.number,
        addressComplement: user.complement,
        mobilePhone: user.mobile,
      },
    };

    const response = await api.post('/payments', paymentParams);

    return {
      transactionId: response.data?.id,
      gatewayStatus: response.data?.status,
    };
  }
}

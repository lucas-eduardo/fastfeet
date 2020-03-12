interface PackageInterface {
  id: number;
  recipient_id: number;
  deliveryman_id: number;
  signature_id: number;
  product: string;
  canceled_at: Date;
  start_date: Date;
  end_date: Date;
}

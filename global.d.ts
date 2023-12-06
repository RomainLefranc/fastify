declare global {
  declare module "fastify" {
    interface PassportUser {
      id: string;
    }
  }
}

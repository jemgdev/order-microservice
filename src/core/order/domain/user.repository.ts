import UserEntity from './user.entity'

export default interface UserRepository {
  getUserById(userId: string): Promise<UserEntity | null>
  updatePersonalInformation({ userId, name, lastname, dateOfBirth, dni, address, avatar }: { userId: string, name: string, lastname: string, dateOfBirth: Date, dni: number, address: string, avatar: string }): Promise<{
    name: string;
    lastname: string;
    dni: number;
    dateOfBirth: Date;
    address: string;
    avatar: string;
}>
  updatePassword({ userId, newPassword }: { userId: string, newPassword: string }): Promise<string>
}

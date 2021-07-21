import bcrypt from 'bcrypt';

class CreateNewUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.HASH_SALT_OR_ROUNDS)
    );

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export { CreateNewUserUseCase };

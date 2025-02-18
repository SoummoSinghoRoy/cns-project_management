import * as bcrypt from 'bcrypt';

class BcryptConfig {
  private saltRounds: number;

  constructor(saltRounds: number = 8) {
    this.saltRounds = saltRounds;
  }

  public async generatePassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(this.saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {
      throw new Error('Error generating password hash');
    }
  }

  public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error('Error comparing passwords');
    }
  }
}

export const bcryptConfig = new BcryptConfig();
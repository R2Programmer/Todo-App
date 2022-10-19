import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
    ){}


  create(createUserDto: CreateUserDto) {
    let user : User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstname;
    user.lastName = createUserDto.lastname;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.NORMAL_ROLE;
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findUserById(id: number){
    return this.userRepository.findOneOrFail({where: {id: id}});
  }

  findUserByEmail(email: string){
    return this.userRepository.findOne({where : {email : email}});
  }

  findOne(id: number) {
    return this.userRepository.findOne({where: {id}});
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}

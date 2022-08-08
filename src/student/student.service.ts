import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  getStudentById(id: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }

  createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstname, lastname } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstname,
      lastname,
    });
    return this.studentRepository.save(student);
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    const students: Student[] = [];
    for (const id of studentIds) {
      const student = await this.studentRepository.findOne({ where: { id } });
      students.push(student);
    }
    return students;
  }
}

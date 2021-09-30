import { RestoreQuestion } from 'src/users/entities/restore-question.entity';
import { Role } from 'src/users/entities/role.entity';
import { User } from 'src/users/entities/users.entity';

export const restoreQuestionSeeds: RestoreQuestion[] = [
  { questionId: 1, question: 'What is your dog name?' },
  { questionId: 2, question: 'What is your favorite song?' },
];

export const roleSeeds: Role[] = [
  { roleId: 1, roleName: 'reviewer' },
  { roleId: 2, roleName: 'admin' },
];

export const userSeeds: Partial<User>[] = [
  {
    userId: 'a507456c-df78-4eea-b390-dfeaa8aa4d5f',
    username: 'foobar',
    password: '$2b$10$83jZNqUn/9rRWhk3wqq9mO/4VdebNNZ2NbFK4XkwgTqpDxuEwmibm',
    question: restoreQuestionSeeds[0],
    role: roleSeeds[0],
    restoreAnswer: 'dog',
  },
  {
    userId: '83471aa6-f588-434e-b309-0f3fe34c4492',
    username: 'admin',
    password: '$2b$10$y23QqZ2ZnOeYbU8eyzYXJODITGxeIMnnRxKWAx0RxGzfvtVH8nIcq',
    restoreAnswer: 'admin',
    role: roleSeeds[1],
    question: restoreQuestionSeeds[0],
  },
];

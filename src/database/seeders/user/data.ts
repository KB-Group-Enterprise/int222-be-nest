import { User } from 'src/users/entities/users.entity';

export const restoreQuestionSeeds: any[] = [
  { questionId: 1, question: 'What is your dog name?' },
  { questionId: 2, question: 'What is your favorite song?' },
];

export const roleSeeds: any[] = [
  { roleId: 1, roleName: 'reviewer' },
  { role: 2, roleName: 'admin' },
];

export const userSeeds: any[] = [
  {
    userId: 'a507456c-df78-4eea-b390-dfeaa8aa4d5f',
    username: 'foobar',
    password: '$2b$10$83jZNqUn/9rRWhk3wqq9mO/4VdebNNZ2NbFK4XkwgTqpDxuEwmibm',
    questionQuestionId: 1,
    roleRoleId: 1,
    restoreanswer: 'dog',
  },
  // {
  //   userId: '83471aa6-f588-434e-b309-0f3fe34c4492',
  //   username: 'admin',
  //   password: '',
  //   restoreanswer: 'cat',
  //   roleRoleId: 2,
  //   questionQuestionId: 1,
  // },
];


import { config } from './config';

export const apiConfig = {
  Password: {
    changePassword: `${config.baseUrl}/changePassword`,
    forgetPassowrd: `${config.baseUrl}/forgotPassword/send-Link`,
    resetPassowrd: `${config.baseUrl}/forgotPassword/reset`,

  },
  DDL: {
  },
  auth: {
    login: `${config.baseUrl}/Auth/Login`,
    registor :`${config.baseUrl}/Auth/Registor`,

  },
  DashboardLayout: {
    getLayoutByUserId: (userid) => `${config.baseUrl}/Dashboard/Layout/${userid}`,
  },
  adminUser: {
    getAll: `${config.baseUrl}/user`,
    getById: (id: string) => `${config.baseUrl}/user/${id}`,
    create: `${config.baseUrl}/user/CreateAdmin`,
    update: (id: string) => `${config.baseUrl}/user/${id}`,
    delete: (id: string) => `${config.baseUrl}/user/${id}`,

  },
  Role: {
    getAll: `${config.baseUrl}/role`,
    getById: (id: string) => `${config.baseUrl}/role/${id}`,
    create: `${config.baseUrl}/role`,
    update: (id: string) => `${config.baseUrl}/role/${id}`,
    delete: (id: string) => `${config.baseUrl}/role/${id}`,


  },
  PagePermission: {
    getById: (id) => `${config.baseUrl}/PagePermissions/ByPage${id}`,
    PagesWithAllPermission: () => `${config.baseUrl}/PagePermissions/PagesWithAllPermissions`,
    update: () => `${config.baseUrl}/pagepermissions/Update`,
  },
  RolePermission: {
    getById: (id) => `${config.baseUrl}/RolePages/GetByRoleId?id=${id}`,
    update: () => `${config.baseUrl}/RolePages/Update`,
  },
  Permission: {
    getAll: `${config.baseUrl}/Permission`,
    getById: (id: string) => `${config.baseUrl}/Permission/${id}`,
    create: `${config.baseUrl}/Permission`,
    update: (id: string) => `${config.baseUrl}/Permission/${id}`,
    delete: (id: string) => `${config.baseUrl}/Permission/${id}`,

  },
  Page: {
    getAll: `${config.baseUrl}/page`,
    getById: (id: string) => `${config.baseUrl}/page/${id}`,
    create: `${config.baseUrl}/page`,
    update: (id: string) => `${config.baseUrl}/page/${id}`,
    delete: (id: string) => `${config.baseUrl}/page/${id}`,
  },
  FYPTitleSuggestion: {
    getAll: `${config.baseUrl}/FYPTitleSuggestion`,
    getById: (id: string) => `${config.baseUrl}/FYPTitleSuggestion/${id}`,
    create: `${config.baseUrl}/FYPTitleSuggestion`,
    update: (id: string) => `${config.baseUrl}/FYPTitleSuggestion/${id}`,
    delete: (id: string) => `${config.baseUrl}/FYPTitleSuggestion/${id}`,
  },
   Book: {
    getAll: `${config.baseUrl}/Book`,
    getById: (id: string) => `${config.baseUrl}/Book/${id}`,
    create: `${config.baseUrl}/Book`,
    update: (id: string) => `${config.baseUrl}/Book/${id}`,
    delete: (id: string) => `${config.baseUrl}/Book/${id}`,
      createWithFiles: `${config.baseUrl}/Book/with-files`,
    updateWithFiles: (id: string) => `${config.baseUrl}/Book/${id}/with-files`,
  },
 SmtpSetting: {
    getAll: `${config.baseUrl}/smtpSetting`,
    getById: (id: string) => `${config.baseUrl}/smtpSetting/${id}`,
    create: `${config.baseUrl}/smtpSetting`,
    update: (id: string) => `${config.baseUrl}/smtpSetting/${id}`,
    delete: (id: string) => `${config.baseUrl}/smtpSetting/${id}`,
    test: (id: string) => `${config.baseUrl}/test/${id}`,
  

    
  },
  Question: {
  getAll: `${config.baseUrl}/Question`,
  getById: (id: string) => `${config.baseUrl}/Question/${id}`,
  create: `${config.baseUrl}/Question`,
  update: (id: string) => `${config.baseUrl}/Question/${id}`,
  addAnswer: (id: string) => `${config.baseUrl}/Question/${id}/answers`,
  getAnswers: (id: string) => `${config.baseUrl}/Question/${id}/answers`,
  delete: (id: string) => `${config.baseUrl}/Question/${id}`,
  deleteAnswer: (answerId: string) => `${config.baseUrl}/Question/answers/${answerId}`,
},
   EmailTemplate: {
    getAll: `${config.baseUrl}/EmailTemplate`,
    getById: (id: string) => `${config.baseUrl}/EmailTemplate/${id}`,
    create: `${config.baseUrl}/EmailTemplate`,
    update: (id: string) => `${config.baseUrl}/EmailTemplate/${id}`,
    delete: (id: string) => `${config.baseUrl}/EmailTemplate/${id}`,
    test: (id: string) => `${config.baseUrl}/EmailTemplate/${id}`,
  },
   MeetingRequest: {
    getAll:  `${config.baseUrl}/MeetingRequest/all`,
    getByStudentId: (id: string) => `${config.baseUrl}/MeetingRequest/Student/${id}`,
    postRequest: `${config.baseUrl}/MeetingRequest`,
    approved: (id: string) => `${config.baseUrl}/MeetingRequest/${id}/approved`,
    Reject: (id: string) => `${config.baseUrl}/MeetingRequest/${id}/reject`,
    
  },
};
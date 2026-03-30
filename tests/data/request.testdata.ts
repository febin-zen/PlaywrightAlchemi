type Messages = {
comment: string;
reply: string;
div?: string;
};
export const REQUESTS_TEST_DATA: {
  menuName: string;
  columnHeaders: string[];
  request: {
    id: string;
    title: string;
    priority: string;
    date: string;
    status: string;
  };

  messages: Messages;
  messageTemplates: {
    comment: string;
    reply: string;
    internalNote: string;
  };
  statuses: string[];
} = {
  menuName: 'Requests',
  columnHeaders: ['TICKET DETAILS', 'PRIORITY', 'CREATED'],

  request: {
    id: 'T1',
    title: 'test 1',
    priority: 'LOW',
    date: '02/02/2026',
    status: 'Open',
  },

  messages: {
    comment: 'Testing comment',
    reply: 'are you done?',
    
  },

  messageTemplates: {
    comment: 'hi testing',
    reply: 'Hi Test',
    internalNote: 'Internal Note',
  },

  statuses: ['Open', 'Closed'],
};



export const CREDIT_REQUEST_DATA = {
  type: 'Credit Request',
  subject: `Test Credit Request 2`,
  description: 'Automation test credit request',
  credits: 28000,
};

export const REQUEST_PRIORITY_DATA = {
  subject: CREDIT_REQUEST_DATA.subject,
  initialPriorityButton: 'URGENT',
  updatedPriority: 'IMPORTANT',
  expectedPriorityCell: 'IMPORTANT',
};

export const REQUEST_CHAT_DATA = {
  requestId: '127b9c2c-2256-4755-bab2-c862d75e05b3',
  requestTitle: 'Test Credit Request 2',
  adminMessage: 'hi',
  userReply: 'fix my issue',
  adminReply: 'Yeaah sure',
};

export const INTERNAL_NOTE_DATA = {
  requestId: '2f183fe1-b959-49a4-a612-5ea86939e62b',
  requestTitle: "Internal Note",
  adminMessages: {
    internal: "Sending message from Admin",
    editedinternal : "Editing Message from Admin"
  },

  userMessages: {
    send: "Sending Message from User",
    edit: "Editing Message from User"
  }

};

export const SEND_EDIT_MSG = {

  requestId: "c39c247b-28c3-45e8-85f9-878273ce96a2",

  requestTitle: "Sending, Editing and Delete",

  adminMessages: {
    send: "Sending message from Admin",
    edit: "Editing Message from Admin"
  },

  userMessages: {
    send: "Sending Message from User",
    edit: "Editing Message from User"
  }

};









const texts = {
  login: {
    title: "Login",
    inputs: {
      email: "Email Address",
      password: "Password",
    },
    button: "Log In",
  },
  topMenu: {
    avatar: {
      profile: "Profile",
      changePassword: "Change Password",
      logout: "Logout",
    },
  },
  user: {
    profile: {
      form: {
        email: "Email",
        firstname: "First Name",
        lastname: "Last Name",
        saveBtn: "Save",
      },
    },
    changePassword: {
      form: {
        currentPassword: "Current Password",
        newPassword: "New Password",
        newPasswordRepeat: "Repeat New Password",
        saveBtn: "Save",
      },
    },
  },
  footer: {
    copyright: "Copyright ©",
  },
  actionsMenu: {
    title: "Actions",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    confirmDialog: {
      titleItemRemoval: "Are you sure you want to remove this item?",
    },
  },
  drawerMenu: {
    secondSection: {
      title: "Administrator",
    },
  },
  orders: {
    form: {
      common: {
        dueDate: {
          label: "Payment Due Date",
        },
      },
      create: {
        button: "Create",
      },
      update: {
        button: "Save",
        paymentDate: {
          label: "Payment Date",
        },
        createdAtDate: {
          label: "Created At Date",
        },
      },
      view: {
        button: "Back",
      },
    },
    actionsMenu: {
      menuItems: {
        orderItems: "Order Items",
      },
    },
    dataGrid: {
      headers: {
        orderNumber: "Order Number",
        dueDate: "Due Date",
        paymentDate: "Payment Date",
        createdAt: "Created At",
      },
    },
    orderItems: {
      dataGrid: {
        headers: {
          name: "Item Name",
          count: "Count",
          cost: "Cost (€)",
          vat: "VAT",
          cost_with_vat: "Cost with VAT (€)",
        },
      },
      form: {
        common: {
          name: {
            label: "Item Name",
          },
          count: {
            label: "Count",
          },
          cost: {
            label: "Cost (€)",
          },
          vat: {
            label: "VAT",
          },
        },
        create: {
          button: "Create",
        },
        update: {
          button: "Save",
        },
        view: {
          cost_with_vat: {
            label: "Cost with VAT (€)",
          },
        },
      },
    },
  },
  confirmDialog: {
    button: {
      confirm: "Confirm",
      decline: "Decline",
    },
  },
  dataGrid: {
    toolbar: {
      button: {
        back: "Back",
        create: "Create",
      },
    },
    headers: {
      actions: "Actions",
    },
  },
}
export default texts

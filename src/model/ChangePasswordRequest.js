export default class ChangePasswordRequest {

    constructor(uuid, oldPassword, newPassword, duplicateNewPassword) {
        this.uuid = uuid;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.duplicateNewPassword = duplicateNewPassword;
    }
  }
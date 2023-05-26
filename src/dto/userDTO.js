export default class UserDTO {
    constructor(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.age = user.age;
        this.email = user.email;
        this.cart = user.cart;
        this.role = user.role;
        this.id = user._id || user.id;
        
    }
}

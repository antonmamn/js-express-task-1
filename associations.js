const User = require('./models/user');
const Post = require('./models/post');
const Book = require('./models/book');
const UserBook = require('./models/user-book');

function defineAssociations() {
    User.hasMany(Post, { foreignKey: 'author', onDelete: 'CASCADE' });
    User.belongsToMany(Book, { through: UserBook,foreignKey:`user_id`, onDelete: 'CASCADE' });
    Post.belongsTo(User, {foreignKey: 'author'});
    Book.belongsToMany(User, {through: UserBook,foreignKey:`book_id`,onDelete: 'CASCADE'})
}

module.exports=defineAssociations()
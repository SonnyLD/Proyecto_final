export default class ViewController {
    constructor({ ProductService, UserService }) {
        this.productService = ProductService;
        this.userService = UserService;
        // TODO: integrate other controllers instead of services and avoid repeating the functions??
    }

    login = (req, res) => {
        try {
            if (!req.isAuthenticated()) {
                return res.status(200).render('login');
            }

            return res.status(200).redirect('/products');
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    };

    async registerUser(req, res) {
        try {
            res.status(200).render('register');
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    }

    getProducts = async (req, res) => {
        try {
            const { limit, sort, page, category } = req.query;
            const options = {
                limit: limit ? Number(limit) : 10,
                page: page ? Number(page) : 1,
                ...(sort && { sort: { price: sort } }),
                ...(category && { category }),
                lean: true,
            };

            let query = {};
            if (category) query = { category: category };

            const paginatedData = await this.productService.getProducts(
                query,
                options
            );

            const user = req.user;

            if (paginatedData) {
                res.status(200).render('products', { ...paginatedData, user });
            } else {
                res.status(404).json({ Error: 'Products not found' });
            }
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    };

    getRealTimeProducts = async (req, res) => {
        try {
            const paginatedData = await this.productService.getProducts(
                {},
                { lean: true }
            );

            const user = req.user;

            if (paginatedData) {
                res.status(200).render('realTimeProducts', {
                    ...paginatedData,
                    user,
                });
            } else {
                res.status(404).json({ Error: 'Products not found' });
            }
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    };

    getCart = async (req, res) => {
        try {
            const userMail = req.user.email;
            const user = await this.userService.getUser(userMail);
            delete user.password;

            if (user) {
                res.status(200).render('cart', { user });
            } else {
                res.status(404).json({ Error: 'Cart not found' });
            }
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    };

    getChat = async (req, res) => {
        try {
            const user = req.user;

            res.status(200).render('chat', { user });
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    };

    getUserCenter = async (req, res) => {
        try {
            const user = req.user;

            res.status(200).render('userCenter', { user });
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    };

    getAdminCenter = async (req, res) => {
        try {
            const user = req.user;

            if (user.role !== 'admin') {
                return res.status(401).json({ Error: 'Unauthorized' });
            }

            res.status(200).render('admin', { user });
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    };

    getUpdateProduct = async (req, res) => {
        try {
            const productID = req.query.productIDPut;

            const product = await this.productService.getProduct(productID);

            const user = req.user;

            if (user.role !== 'admin') {
                return res.status(401).json({ Error: 'Unauthorized' });
            }

            if (product) {
                return res
                    .status(200)
                    .render('updateProduct', { ...product, productID, user });
            }

            res.status(404).json({ Error: 'Product not found' });
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    };

    getError = async (req, res) => {
        try {
            res.status(200).render('error', { error: 'Error' });
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    };
}

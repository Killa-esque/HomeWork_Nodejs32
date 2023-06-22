import { Sequelize } from 'sequelize';
import initModels from '../model/init-models.js';
import sequelize from '../model/index.js';
import { errorCode, failCode, successCode } from '../config/response.js';

const models = initModels(sequelize);
const Op = Sequelize.Op;

// Xử lý like nhà hàng
const handleLike = async (req, res) => {
    try {
        const { user_id, res_id } = req.body;
        const date_like = new Date();

        await models.like_res.create({ user_id, res_id, date_like });
        successCode(res, "", 'Restaurant liked successfully');
    } catch (err) {
        errorCode(res, 'Error liking the restaurant.');
    }
};

const handleUnlike = async (req, res) => {
    try {
        const { user_id, res_id } = req.body;

        await models.like_res.destroy({ where: { user_id, res_id } });
        successCode(res, null, 'Restaurant unliked successfully');
    } catch (err) {
        errorCode(res, 'Error unliking the restaurant.');
    }
};

const getLikeListByResId = async (req, res) => {
    try {
        const res_id = req.params.res_id;

        const results = await models.like_res.findAll({ where: { res_id } });
        successCode(res, results, 'Retrieved likes for the restaurant successfully');
    } catch (err) {
        errorCode(res, 'Error retrieving likes for the restaurant.');
    }
};

const getLikeListByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const results = await models.like_res.findAll({ where: { user_id } });
        successCode(res, results, 'Retrieved likes for the user successfully');
    } catch (err) {
        errorCode(res, 'Error retrieving likes for the user.');
    }
};

// Xử lý đánh giá nhà hàng
const handleRate = async (req, res) => {
    try {
        const { user_id, res_id, amount } = req.body;
        const date_rate = new Date();

        const existingRating = await models.rate_res.findOne({ where: { user_id, res_id } });
        if (existingRating) {
            await models.rate_res.update({ amount, date_rate }, { where: { user_id, res_id } });
            successCode(res, { rating: { user_id, res_id, amount, date_rate } }, 'Restaurant rating updated successfully');
        } else {
            const newRating = await models.rate_res.create({ user_id, res_id, amount, date_rate });
            successCode(res, { rating: newRating }, 'Restaurant rated successfully');
        }
    } catch (err) {
        errorCode(res, 'Error rating the restaurant.');
    }
};


const getRateByResId = async (req, res) => {
    try {
        const res_id = req.params.res_id;

        const ratings = await models.rate_res.findAll({ where: { res_id } });
        successCode(res, ratings, 'Retrieved ratings for the restaurant successfully');
    } catch (err) {
        errorCode(res, 'Error retrieving ratings for the restaurant.');
    }
};

const getRateByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const ratings = await models.rate_res.findAll({ where: { user_id } });
        successCode(res, ratings, 'Retrieved ratings for the user successfully');
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving ratings for the user.' });
    }
};

// User đặt món
const handleOrder = async (req, res) => {
    try {
        const { user_id, food_id, quantity, code, arr_sub_id } = req.body;

        const existingOrder = await models.order.findOne({ where: { user_id, food_id } });
        if (existingOrder) {
            return failCode(res, "", 'Order is already being processed.')
        }

        const parsedArrSubId = JSON.parse(arr_sub_id);

        const newOrder = await models.order.create({ user_id, food_id, amount: quantity, code, arr_sub_id: JSON.stringify(parsedArrSubId) });
        successCode(res, { order: newOrder }, 'Food ordered successfully');
    } catch (err) {
        errorCode(res, 'Error placing the order.')
    }
};



const getOrderListByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        const orders = await models.order.findAll({ where: { user_id } });
        successCode(res, orders, 'Retrieved orders for the user successfully');
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving orders for the user.' });
    }
};

export {
    handleLike,
    handleUnlike,
    getLikeListByResId,
    getLikeListByUserId,
    handleRate,
    getRateByUserId,
    getRateByResId,
    handleOrder,
    getOrderListByUserId
};

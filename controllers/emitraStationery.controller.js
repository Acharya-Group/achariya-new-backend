import Order from "../models/EmitraStationery.js";

// ✅ Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      name,
      phoneNo,
      kioskId,
      address,
      pinCode,
      items,
      amount, 
      transactionId,
      paymentStatus,
    } = req.body;

    if (!amount || !name || !phoneNo || !kioskId || !address || !pinCode) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const order = new Order({
      name,
      phoneNo,
      kioskId,
      address,
      pinCode,
      items,
      amount,
      transactionId: transactionId || null,
      paymentStatus: paymentStatus || "pending",
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ✅ Update order (status, payment, amount, or any field)
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Get all orders
const allOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const orders = await Order.find().lean()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); 

    const total = await Order.countDocuments();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};


// ✅ Get single order by ID
const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order fetched successfully", data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Delete order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully", data: deletedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export { createOrder, updateOrder, allOrders, getSingleOrder, deleteOrder };

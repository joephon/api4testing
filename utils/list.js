module.exports = async function list ({ criteria = {}, options = {}, page = 1, pageSize = 10, sort = { createdAt: -1 } }) {
    const result = await this.find(criteria, options).limit(pageSize).skip((page - 1) * pageSize).sort(sort)
    const total = await this.countDocuments(criteria)
    const meta = { total: total, pageSize, page, next: total - page * pageSize > 0 ? total - page * pageSize : 0, sort }
    return {
      result,
      meta
    };
  }
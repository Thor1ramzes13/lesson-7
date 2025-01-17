import mongoose from 'mongoose'
import Convict from './Convict.mjs'

class ConvictsDBService {
	static async getList() {
		try {
			const exists = await Convict.checkCollectionExists
			if (exists) {
				const data = await mongoose.model('Convict').find().exec()
				return data
			}
			return (await Convict.find({})) ?? []
		} catch (error) {
			return []
		}
	}
	static async create(data) {	
		const convict = new Convict(data)
		return await convict.save()
	}
	static async getById(id) {
		return await Convict.findById(id)
	}
	static async update(id, data) {
		return await Convict.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true
		})
	}
	static async deleteById(id) {
		return await Convict.findByIdAndDelete(id)
	}
}

export default ConvictsDBService
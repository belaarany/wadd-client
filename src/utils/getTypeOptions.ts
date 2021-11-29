import { typeOptions } from "@wadd/configs/consts"

export const getTypeOptions = (...types) => {
	return typeOptions.filter(o => !types.length || types.includes(o.id))
}

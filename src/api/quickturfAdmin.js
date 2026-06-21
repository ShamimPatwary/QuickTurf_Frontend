import api from './axios'

export const getTurfs = () => api.get('/quickturf-admin/turfs')
export const createTurf = (data) => api.post('/quickturf-admin/turfs', data)
export const updateTurf = (id, data) => api.put(`/quickturf-admin/turfs/${id}`, data)
export const deleteTurf = (id) => api.delete(`/quickturf-admin/turfs/${id}`)
export const suspendTurf = (id) => api.patch(`/quickturf-admin/turfs/${id}/suspend`)
export const unsuspendTurf = (id) => api.patch(`/quickturf-admin/turfs/${id}/unsuspend`)
export const getAllBookings = () => api.get('/quickturf-admin/bookings')
export const getQuickTurfBookings = () => api.get('/quickturf-admin/bookings/from-quickturf')

import api from './axios'

export const getDashboard = () => api.get('/turf-admin/dashboard')
export const getMe = () => api.get('/turf-admin/me')
export const changePassword = (data) => api.put('/turf-admin/change-password', data)

export const getSports = () => api.get('/turf-admin/sports')
export const createSport = (data) => api.post('/turf-admin/sports', data)
export const updateSport = (id, data) => api.put(`/turf-admin/sports/${id}`, data)
export const deleteSport = (id) => api.delete(`/turf-admin/sports/${id}`)

export const getSlots = () => api.get('/turf-admin/slots')
export const createSlot = (data) => api.post('/turf-admin/slots', data)
export const updateSlot = (id, data) => api.put(`/turf-admin/slots/${id}`, data)
export const deleteSlot = (id) => api.delete(`/turf-admin/slots/${id}`)

export const getPackages = () => api.get('/turf-admin/packages')
export const createPackage = (data) => api.post('/turf-admin/packages', data)
export const updatePackage = (id, data) => api.put(`/turf-admin/packages/${id}`, data)
export const deletePackage = (id) => api.delete(`/turf-admin/packages/${id}`)

export const getMemberships = () => api.get('/turf-admin/memberships')
export const createMembership = (data) => api.post('/turf-admin/memberships', data)
export const updateMembership = (id, data) => api.put(`/turf-admin/memberships/${id}`, data)
export const deleteMembership = (id) => api.delete(`/turf-admin/memberships/${id}`)

export const getBookings = () => api.get('/turf-admin/bookings')
export const createBooking = (data) => api.post('/turf-admin/bookings', data)
export const updateBooking = (id, data) => api.put(`/turf-admin/bookings/${id}`, data)
export const deleteBooking = (id) => api.delete(`/turf-admin/bookings/${id}`)

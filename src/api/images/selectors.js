export const selectImageById = (state, id) => state.imageStore.images.find(p => p.id === id);
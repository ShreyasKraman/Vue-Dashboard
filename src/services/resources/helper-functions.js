function getLocationId(roles){
    for (let role of roles) {
        if (role.roleName === 'ManageLocation' && role.entityType === 'Location') {
            return role.locationEntityId;
        }
    }
}


export const helperfunction = {
    getLocationId
}
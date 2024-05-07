/**
 * This resolver assumes the part IDs will be a field from the parent field OR be included in the stash.
 */
export function request(ctx) {
    /**
     * @type {string[] | undefined}
     */
    const partIds = ctx.source.partIds ? ctx.source.partIds : ctx.stash.partIds;

    if (partIds === undefined) {
        util.error('No part IDs supplied.')
    }


    const parts = [
        {
            id: "1",
            name: "Headlights"
        },
        {
            id: "2",
            name: "Sunroof"
        },
        {
            id: "3",
            name: "Leather Seats"
        },
        {
            id: "4",
            name: "Cloth Seats"
        }
    ];

    return {
        payload: parts.filter(part => partIds.includes(part.id))
    };
}

export function response(ctx) {
    return ctx.result
}

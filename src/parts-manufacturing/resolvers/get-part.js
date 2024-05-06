export function request(ctx) {
    const { id } = ctx.args;

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
        payload: parts.find(part => part.id == id)
    };
}

export function response(ctx) {
    return ctx.result
}

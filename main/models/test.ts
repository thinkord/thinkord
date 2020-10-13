import { db } from "./index";

const getAllData = (db: db) => {
    db.sequelize
        .sync({ force: true })
        .then(() => {
            db.Folder.create({ name: 'Martin' })
                .then(() => {
                    console.log('Folder created.')
                })
                .catch((error: any) => {
                    console.error(error)
                })
            db.Folder.create({ name: 'Tim' })
                .then(() => {
                    console.log('Folder created.')
                })
                .catch((error: any) => {
                    console.error(error)
                })
        })
        .then(() => {
            db.Collection.create({
                name: 'test',
                display: true,
                folderId: 1
            })
                .then(() => {
                    console.log('Collection created.')
                })
                .catch((error: any) => {
                    console.error(error)
                })
        })
        .then(() => {
            db.Collection.create({
                name: 'test',
                display: true,
                folderId: 2
            })
                .then(() => {
                    console.log('Collection created.')
                })
                .catch((error: any) => {
                    console.error(error)
                })
        })
        .then(() => {
            db.Block.create({
                title: 'test',
                type: 'image',
                description: 'this is test image',
                bookmark: true,
                collectionId: 1
            })
                .then(() => {
                    console.log('Block created.')
                })
                .catch((error: any) => {
                    console.error(error)
                })
        })
        .then(async () => {
            let query = await db.Folder.findAll({
                include: { all: true, nested: true }
            })

            console.log(JSON.stringify(query, null, 2))
        })
        .catch((error: any) => {
            console.error('Unable to connect to the database:', error);
        })
}

export { getAllData }
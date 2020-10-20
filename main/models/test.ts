import { db } from "./index";
import log from "loglevel";

const getAllData = (db: db) => {
    db.sequelize
        .sync({ force: true })
        .then(() => {
            db.Folder.create({ name: "Martin" })
                .then(() => {
                    log.info("Folder created.");
                })
                .catch((error: any) => {
                    log.error(error);
                });
            db.Folder.create({ name: "Tim" })
                .then(() => {
                    log.info("Folder created.");
                })
                .catch((error: any) => {
                    log.error(error);
                });
        })
        .then(() => {
            db.Collection.create({
                name: "test",
                display: true,
                folderId: 1,
            })
                .then(() => {
                    log.info("Collection created.");
                })
                .catch((error: any) => {
                    log.error(error);
                });
        })
        .then(() => {
            db.Collection.create({
                name: "test",
                display: true,
                folderId: 2,
            })
                .then(() => {
                    log.info("Collection created.");
                })
                .catch((error: any) => {
                    log.error(error);
                });
        })
        .then(() => {
            db.Block.create({
                title: "test",
                type: "image",
                description: "this is test image",
                bookmark: true,
                collectionId: 1,
            })
                .then(() => {
                    log.info("Block created.");
                })
                .catch((error: any) => {
                    log.error(error);
                });
        })
        .then(async () => {
            const query = await db.Folder.findAll({
                include: { all: true, nested: true },
            });

            log.info(JSON.stringify(query, null, 2));
        })
        .catch((error: any) => {
            log.error("Unable to connect to the database:", error);
        });
};

export { getAllData };

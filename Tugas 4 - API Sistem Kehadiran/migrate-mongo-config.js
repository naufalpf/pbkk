module.exports = {
  mongodb: {
    url: "mongodb://localhost:27017",
    databaseName: "tugas4pbkk",
    options: {
      useNewUrlParser: true
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog"
};

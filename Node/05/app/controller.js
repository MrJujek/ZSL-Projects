// załącz klasę Animal i tablicę zwierząt
const { tasks } = require("./model");

module.exports = {
    add: (data) => {
        let obj = JSON.parse(data)
        console.log(obj);
        obj.id = tasks[tasks.length - 1].id + 1

        tasks.push(obj)

        return `added`
    },

    delete: (id) => {
        console.log(id);
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == id) {
                tasks.splice(i, 1)

                return `task ${id} deleted`
            }
        }
        return `task ${id} not found`
    },

    patch: (data) => {
        console.log(data);
        let obj = JSON.parse(data)

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == obj.id) {
                tasks[i] = obj

                return `task ${obj.id} updated`
            }
        }
        return `task ${obj.id} not found`
    },

    getall: () => {
        return tasks
    },

    get: (id) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id == id) {
                return tasks[i]
            }
        }
        return `task ${id} not found`
    },

    getExtensionType: (extension) => {
        switch (extension) {
            case "css":
                return "text/css";
            case "js":
                return "text/javascript";
            case "html":
                return "text/html";
            default:
                return "text/plain";
        }
    }

}
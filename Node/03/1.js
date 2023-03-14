const test = async (x) => {
    return new Promise((resolve, reject) => {
        let interval
        let i = 0
        try {
            interval = setInterval(() => {
                console.log("liczę...")
                if (i < x) {
                    i++
                }
                else {
                    clearInterval(interval)
                    resolve(x * x)
                    console.log(`wynik = ${x * x}`)
                }

            }, 500);

        } catch (error) {
            reject(error)
        }

    })
}

check = async () => {
    const x = await test(4)
    const y = await test(3)
    const sum = `suma = ${x + y}`
    console.log(sum);
}

check()
import db from 'mysql2/promise'

const connectDB = db.createPool({
    host : `${process.env.NEXT_PUBLIC_DATABASE_HOST}`,
    user: `${process.env.NEXT_PUBLIC_DATABASE_USERNAME}`,
    password: `${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}`,
    database: `${process.env.NEXT_PUBLIC_DATABASE_NAME}`,
    ssl : {
        rejectUnauthorized: true
    }
})

export default connectDB




// import db from 'mysql2/promise'

// const connectDB = db.createPool({
//     host : 'localhost',
//     user: 'root',
//     password: 'vmfhsxmdosem',
//     database: "park"
// })

// export default connectDB
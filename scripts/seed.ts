import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    const data: Prisma.UserExampleCreateArgs['data'][] = [
      // To try this example data with the UserExample model in schema.prisma,
      // uncomment the lines below and run 'yarn rw prisma migrate dev'
      //
      // { name: 'alice', email: 'alice@example.com' },
      // { name: 'mark', email: 'mark@example.com' },
      // { name: 'jackie', email: 'jackie@example.com' },
      // { name: 'bob', email: 'bob@example.com' },
    ]
    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    Promise.all(
      //
      // Change to match your data model and seeding needs
      //
      data.map(async (data: Prisma.UserExampleCreateArgs['data']) => {
        const record = await db.userExample.create({ data })
        console.log(record)
      })
    )

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:

    const users = [
      {
        name: 'admin only',
        email: 'admin@example.com',
        password: 'Test1234!',
        roles: ['ADMIN'],
      },
      {
        name: 'drikus',
        email: 'drikusroor@gmail.com',
        password: 'Test1234!',
        roles: ['GUEST', 'USER', 'MODERATOR', 'ADMIN'],
      },
      { name: 'john', email: 'john@example.com', password: 'secret1' },
      { name: 'jane', email: 'jane@example.com', password: 'secret2' },
      {
        name: 'naomi',
        email: 'nreliasar@gmail.com@gmail.com',
        password: 'Test1234!',
        roles: ['GUEST', 'USER', 'MODERATOR', 'ADMIN'],
      },
      {
        name: 'moeder is guest',
        email: 'memoeder@example.com',
        password: 'Test1234!',
        roles: ['GUEST'],
      },
      {
        name: 'vader is user',
        email: 'mevader@example.com',
        password: 'Test1234!',
        roles: ['USER'],
      },
    ]

    for (const user of users) {
      const [hashedPassword, salt] = hashPassword(user.password)
      await db.user.create({
        data: {
          name: user.name,
          email: user.email,
          hashedPassword,
          salt,
          roles: user.roles,
        },
      })
    }

    const posts = [
      {
        title: 'First Post',
        body: 'This is my first post',
        published: true,
        userId: 1,
        imageGalleries: {
          create: [
            {
              imageGallery: {
                create: {
                  name: 'First Gallery',
                  description: 'This is the first gallery',
                  images: {
                    create: [
                      {
                        imageId: 'b1b9a0c0-9f0a-11eb-8dcd-0242ac130003',
                        url: 'https://picsum.photos/seed/1/200/300',
                      },
                      {
                        imageId: 'b1b9a0c0-9f0a-11eb-8dcd-0242ac130004',
                        url: 'https://picsum.photos/seed/2/200/300',
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        location:
          'Shibuya Scramble Crossing, 21 Udagawa-cho, Shibuya City, Tokyo, Japan',
      },
      {
        title: 'Second Post',
        body: `# Exuit corpora\n ## Utraque deae quo pars gestamina subterque de Lorem markdownum saucius te veniam portas arsit tactas. \n\nNon mediis. ipx_newline -= null; if (rate_printer(integrated.exploitVariable(dma + emulation, -1, -2), 554416 * file)) { ripcording = -1; peripheral_e_task = 5; } var maskMarketClock = code_computer_cpl - software_linux_cpu( reimageTouchscreenTerabyte(stringCron)); \n\nSilvis tu satis mentem. Tertius nos etiam sede deieci cuspis habebat disparibus labare inque quicquam! [Dabat certius](http://cornuaultime.net/monstratum-amento.php) mihi. \n\n ## Securi lacrimaeque nupta at ab nascentia imperat Fessis exilio esse videre, nuda Solem quoque pectus est capitis [luctus](http://www.lecti.com/), unius omni. Et caruit ista bracchia urbis nuper.\n\n - Nostra deploratosque gemitu desit\n - Equinis sanguis saepe primum`,
        published: true,
        userId: 1,
        location: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan',
      },
      {
        title: 'Third Post',
        body: '# A chotto matte\n\n ## Utraque deae quo pars gestamina subterque de\nLorem markdownum saucius te veniam portas arsit tactas. Non mediis.\n- Nostra deploratosque gemitu desit\n- Equinis sanguis saepe primum',
        published: true,
        userId: 1,
        type: 'CHOTTO',
        location: 'Dejimamachi, Nagasaki, Japan',
      },
    ]

    for (const post of posts) {
      await db.post.create({
        data: post,
      })
    }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}

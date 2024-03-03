// eslint-disable-next-line strict
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('movie').del()
        .then(() => {
            // Inserts seed entries
            return knex('movie').insert([
                {
                    title: 'The Shawshank Redemption',
                    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                    releaseDate: '1994-09-23',
                    director: 'Frank Darabont'
                },
                {
                    title: 'The Godfather',
                    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
                    releaseDate: '1972-03-24',
                    director: 'Francis Ford Coppola'
                },
                {
                    title: 'The Dark Knight',
                    description: 'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
                    releaseDate: '2008-07-18',
                    director: 'Christopher Nolan'
                },
                {
                    title: 'Pulp Fiction',
                    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
                    releaseDate: '1994-10-14',
                    director: 'Quentin Tarantino'
                },
                {
                    title: 'Forrest Gump',
                    description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.',
                    releaseDate: '1994-07-06',
                    director: 'Robert Zemeckis'
                },
                {
                    title: 'Inception',
                    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
                    releaseDate: '2010-07-16',
                    director: 'Christopher Nolan'
                },
                {
                    title: 'The Matrix',
                    description: 'A computer hacker learns about the true nature of his reality and his role in the war against its controllers.',
                    releaseDate: '1999-03-31',
                    director: 'Lana Wachowski, Lilly Wachowski'
                },
                {
                    title: 'Schindler\'s List',
                    description: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
                    releaseDate: '1993-11-30',
                    director: 'Steven Spielberg'
                },
                {
                    title: 'The Lord of the Rings: The Return of the King',
                    description: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
                    releaseDate: '2003-12-17',
                    director: 'Peter Jackson'
                },
                {
                    title: 'Fight Club',
                    description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
                    releaseDate: '1999-10-15',
                    director: 'David Fincher'
                }
            ]);
        });
};

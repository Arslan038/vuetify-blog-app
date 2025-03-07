const formateDate = (date) => {
    if (date) {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    }
}

const demoPosts = [
    {
        "id": 1,
        "title": "The Future of AI The Future of AI The Future of AI",
        "text": "Artificial Intelligence is transforming industries and reshaping the way we live and work. Artificial Intelligence is transforming industries and reshaping the way we live and work.",
        "author": "John Doe",
        "date": "2023-10-01"
    },
    {
        "id": 2,
        "title": "Exploring Space",
        "text": "Space exploration continues to push the boundaries of human knowledge and technology.",
        "author": "Jane Smith",
        "date": "2023-10-05"
    },
    {
        "id": 3,
        "title": "Sustainable Living",
        "text": "Adopting sustainable practices is crucial for the health of our planet and future generations.",
        "author": "Alice Johnson",
        "date": "2023-10-10"
    },
    {
        "id": 4,
        "title": "The Rise of Quantum Computing",
        "text": "Quantum computing promises to revolutionize computing power and solve complex problems.",
        "author": "Bob Brown",
        "date": "2023-10-15"
    },
    {
        "id": 5,
        "title": "The Art of Storytelling",
        "text": "Storytelling is a powerful tool for connecting people and sharing ideas across cultures.",
        "author": "Charlie Davis",
        "date": "2023-10-20"
    },
    {
        "id": 6,
        "title": "Healthy Eating Habits",
        "text": "A balanced diet is essential for maintaining good health and preventing diseases.",
        "author": "Diana Evans",
        "date": "2023-10-25"
    },
    {
        "id": 7,
        "title": "The Importance of Mental Health",
        "text": "Taking care of your mental health is just as important as physical health.",
        "author": "Ethan Harris",
        "date": "2023-10-30"
    },
    {
        "id": 8,
        "title": "The Evolution of Smartphones",
        "text": "Smartphones have become an integral part of our daily lives, evolving rapidly over the years.",
        "author": "Fiona Clark",
        "date": "2023-11-01"
    },
    {
        "id": 9,
        "title": "The Power of Renewable Energy",
        "text": "Renewable energy sources like solar and wind are key to a sustainable future.",
        "author": "George Lewis",
        "date": "2023-11-05"
    },
    {
        "id": 10,
        "title": "The Impact of Social Media",
        "text": "Social media has changed the way we communicate, share information, and perceive the world.",
        "author": "Hannah White",
        "date": "2023-11-10"
    }
]

export { demoPosts, formateDate };
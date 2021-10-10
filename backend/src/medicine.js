exports.getMedicine = async (req, res) => {
    console.log("customer ID:", req.params.customer);
    res.status(200).json(
        [
            {
                "name": "Pfizer",
                "description": "Helps against COVID-19",
                "id": "17b0afb2-df3a-4047-a394-249817f3fe32"
            }
        ]
    );
};

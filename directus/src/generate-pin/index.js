//import crypto from 'crypto';

export default function registerEndpoint(router, { database, logger }) {

    function generateNumericPin(length = 6) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
    }

    //util for generating pin
    async function generateUniquePin(length = 6) {
        let PIN;
        let isUnique = false;

        while (!isUnique) {

            PIN = generateNumericPin(length);

            // Check if the  PIN is unique in the db
            const existingPin = await database('session_test').where({ PIN }).first();
            isUnique = !existingPin;
        }

        return PIN;
    }

    router.post('/', async (req, res) => {
        const { session_id } = req.body;

        if (!session_id) {
            return res.status(400).json({ error: "Session ID is required." });
        }

        try {
            const PIN = await generateUniquePin(6);

            await database('session_test')
                .where({ id: session_id })
                .update({ PIN });

            // Respond with the generated PIN
            res.json({
                pin: PIN,
                message: "Unique PIN generated and saved successfully"
            });
        } catch (error) {
            logger.error("Error generating or saving unique PIN:", error);
            res.status(500).json({ error: "An error occurred while generating and saving the PIN." });
        }
    });
}

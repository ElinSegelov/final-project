export const boardGameData = async (req, res) => {
	const accessToken = req.header("Authorization");
	if (accessToken) {
		const { searchParameter } = req.body;
    if (searchParameter) {
			const BGA_API = `https://api.boardgameatlas.com/api/search?name=${searchParameter}&limit=100&client_id=${process.env.BGA_CLIENT_ID}`;
			try {
				const response = await fetch(BGA_API);
				const gameData = await response.json();

				if (gameData) {
          const info = gameData.games;
          const baseGames = info.filter((game) => game.type === 'game');

          res.status(200).json({
            success: true,
            response: baseGames
          });
				};
			} catch (err) {
				res.status(503).json({
					success: false,
					response: err.stack
				});
			}
		} else {
			res.status(400).json({
				success: false,
				response: "Please provide searchParameter"
			});
		};
	} else {
		res.status(401).json({
			success: false,
			response: "Please log in"
		});
	};
};
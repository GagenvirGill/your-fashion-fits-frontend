import React from "react";
import styles from "./VideoEmbed.module.css";

const YoutubeEmbed = ({ ytVideoId }) => {
	return (
		<div>
			<iframe
				src={`https://www.youtube.com/embed/${ytVideoId}`}
				title="YouTube video"
				className={styles.videoEmbed}
				allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	);
};

export default YoutubeEmbed;

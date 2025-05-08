import React from "react";
import styles from "./VideoEmbed.module.css";

const YoutubeEmbed = ({ ytVideoId }) => {
	return (
		<div>
			<iframe
				src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&mute=1`}
				title="YouTube video"
				className={styles.videoEmbed}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	);
};

export default YoutubeEmbed;

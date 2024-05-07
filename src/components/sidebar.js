import $ from "jquery";
import "./sidebar.css";

export default async function createSidebar(parent) {
	
	const html = `<div id="sidebar" class="movein">
		<div id="toggleBtn" class="ui icon button">
			<i class="angle left icon"></i>
		</div>
		<div class="ui segment" id="panel">
			<div class="ui one column grid">
				<div class="row">
					<div class="column">

						<div id="cercaLlocs"></div>

					</div>

					<div class="column">
						<div class="ui divider"></div>
					</div>

					<div class="ui three mini item secondary menu mm">
						<div class="item">
							<a title="Informació" href="https://eines.icgc.cat/geocodificador/api-docs/" target="_blank">
								<i class="large info circle link white icon"></i>
							</a>
						</div>
						<!--
						<div class="item">
							<a href="https://twitter.com/share" class="twitter-share-button" {count} data-text="Geocodificador ICGC" data-via="icgcat" data-hashtags="Catalunya">Tweet</a>
							<script>
								! function(d, s, id) {
									var js, fjs = d.getElementsByTagName(s)[0],
										p = /^http:/.test(d.location) ? 'http' : 'https';
									if (!d.getElementById(id)) {
										js = d.createElement(s);
										js.id = id;
										js.src = p + '://platform.twitter.com/widgets.js';
										fjs.parentNode.insertBefore(js, fjs);
									}
								}(document, 'script', 'twitter-wjs');
							</script>
						</div>
						-->
					</div>
				</div>
			</div>
		</div>
	</div>`;
	const template = document.createElement("template");
	template.innerHTML = html;

	$(parent).append(template.content.cloneNode(true));

	$("#toggleBtn").click(function() {
		if ($("#sidebar").hasClass("movein")) {
			$("#sidebar").removeClass("movein").addClass("moveout");
			$("#toggleBtn > i").removeClass("left").addClass("right");
		} else {
			$("#sidebar").removeClass("moveout").addClass("movein");
			$("#toggleBtn > i").removeClass("right").addClass("left");
		}
	});

	/*
	$(".ui.launch.button").on("click", function(){
		console.log($(".ui.launch.button"));

		if ($("#sidebar").hasClass("movein")) {
			//$("#sidebar").removeClass("movein").addClass("moveout");
			//$(".ui.launch.button").removeClass("right").addClass("left");
		} else {
			//$("#sidebar").removeClass("moveout").addClass("movein");
			//$(".ui.launch.button").removeClass("left").addClass("right");
		}
	});
	
	$(".ui.sidebar").sidebar({
		transition: "overlay",
		context: $("#sidebar"),
		dimPage: false
	}).sidebar("attach events",".ui.launch.button");
	*/

	return true;

}

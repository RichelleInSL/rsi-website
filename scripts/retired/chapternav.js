function setChapterNavs(sPage) {
	var prevChapterLinks = document.getElementsByClassName('previouschapter');
	var nextChapterLinks = document.getElementsByClassName('nextchapter');


	console.log('JavaScript: Full path: ' + sPage);

	var sPageName = sPage.split("/").pop(); //Split it at the slashes and pop off the last element.  Should be the page name.
	console.log('JavaScript: Page Name: ' + sPageName);
	var sStoryKey = sPageName.substring(0,sPageName.indexOf("_")); //Get the substring from the beginning to the first underscore.  This should be the story number.
	var sTemp = sPageName.substring(sPageName.indexOf("_")+1); //Find the first underscore and then keep only the remainder of the string.
	var iChapter = sTemp.substring(0,sTemp.indexOf("_")); //Keep only from the beginning of the string until the second underscore.  That should leave only the chapter number.
	var targetStory = [];
	
	console.log('JavaScript: Story Key: ' + sStoryKey);
	console.log('JavaScript: Chapter: ' + iChapter);
	
	var chapters001=[
		'001_the_cuthbert_exception.html'
	]

	var chapters017=[
		'017_01_trying_times_chapter_01_the_nightmare_scenario.html',
		'017_02_trying_times_chapter_02_the_start_of_nothing.html',
		'017_03_trying_times_chapter_03_the_reason.html',
		'017_04_trying_times_chapter_04_out_of_focus.html',
		'017_05_trying_times_chapter_05_marcys_minute.html',
		'017_06_trying_times_chapter_06_shrink_wrapped.html',
		'017_07_trying_times_chapter_07_dismantled.html',
		'017_08_trying_times_chapter_08_just_plain_wrong.html',
		'017_09_trying_times_chapter_09_pounding_it_out.html',
		'017_10_trying_times_chapter_10_off_route.html',
		'017_11_trying_times_chapter_11_catching_up.html',
		'017_12_trying_times_chapter_12_fear_factor.html',
		'017_13_trying_times_chapter_13_shaken.html',
		'017_14_trying_times_chapter_14_hardening.html',
		'017_15_trying_times_chapter_15_questions_and_answers.html',
		'017_16_trying_times_chapter_16_unchained.html',
		'017_17_trying_times_chapter_17_starstruck.html',
		'017_18_trying_times_chapter_18_the_shadow_knows.html',
		'017_19_trying_times_chapter_19_getting_serious.html',
		'017_20_trying_times_chapter_20_the_inimitable_original.html',
		'017_21_trying_times_chapter_21_mind_over_matter.html',
		'017_22_trying_times_chapter_22_seating_upgrade.html',
		'017_23_trying_times_chapter_23_aggressive_tactics.html',
		'017_24_trying_times_chapter_24_myth_vs_legend.html',
		'017_25_trying_times_chapter_25_what_it_takes.html',
		'017_26_trying_times_chapter_26_one_of_the_girls.html',
		'017_27_trying_times_chapter_27_victory_with_a_twist.html',
		'017_28_trying_times_chapter_28_just_full_of_surprises.html',
		'017_29_trying_times_chapter_29_talk_is_cheap.html',
		'017_30_trying_times_chapter_30_beyond_control.html',
		'017_31_trying_times_chapter_31_feeling_the_burn.html',
		'017_32_trying_times_chapter_32_they_are_us.html',
		'017_33_trying_times_chapter_33_just_like_that.html',
		'017_34_trying_times_chapter_34_i_bleed_therefore_i_am.html',
		'017_35_trying_times_chapter_35_the_best_laid_plans.html',
		'017_36_trying_times_chapter_36_round_and_round.html',
		'017_37_trying_times_chapter_37_ungrounded.html',
		'017_38_trying_times_chapter_38_one_more_time_around.html',
		'017_39_trying_times_chapter_39_two_long.html',
		'017_40_trying_times_chapter_40_confronting_destiny.html',
		'017_41_trying_times_chapter_41_young_and_old.html',
		'017_42_trying_times_chapter_42_everyday_emily.html',
		'017_43_trying_times_chapter_43_gutting_it_out.html',
		'017_44_trying_times_chapter_44_proven_vengeance.html',
		'017_45_trying_times_chapter_45_fact_based_analysis.html',
		'017_46_trying_times_chapter_46_a_tense_friendship.html',
		'017_47_trying_times_chapter_47_dealing_with_danni.html',
		'017_48_trying_times_chapter_48_flipping_the_switch.html',
		'017_49_trying_times_chapter_49_finding_my_place.html',
		'017_50_trying_times_chapter_50_next_question.html',
		'017_51_trying_times_chapter_51_walking_it_off.html',
		'017_52_trying_times_chapter_52_a_heros_welcome.html'
	]
	
	var chapters018=[
		'001_the_cuthbert_exception.html'
	]

	switch(sStoryKey) {
	  case '001':
		console.log('Copying the array');
		targetStory=Array.from(chapters001);
		break;
	  case '017':
		console.log('Copying the array');
		targetStory=Array.from(chapters017);
		break;
	  case '018':
		console.log('Copying the array');
		targetStory=Array.from(chapters018);
		break;
	  default:
		// code block
	}
	
	var iPreviousChapter=(iChapter*1)-1; //the *1 forces the result to be an integer
	var iNextChapter=(iChapter*1)+1; //the *1 forces the result to be an integer
	
	
	var iLastChapter=targetStory.length;
	
	console.log('Current chapter: ' + iChapter);
	console.log('Previous chapter: ' + iPreviousChapter);
	console.log('Next chapter: ' + iNextChapter);
	console.log('Last chapter: ' + iLastChapter);

	for (var i=0, len=prevChapterLinks.length|0; i<len; i=i+1|0) {
		if (iPreviousChapter<1) {
			console.log('Previous link has been hidden');
			prevChapterLinks[i].classList.add('hidden');
			prevChapterLinks[i].href='';
		} else {
			prevChapterLinks[i].href=targetStory[iPreviousChapter-1]; //Subtract 1 because array is 0 based
		}
	}

	for (var i=0, len=nextChapterLinks.length|0; i<len; i=i+1|0) {
		if (iNextChapter>iLastChapter) {
			console.log('Next link has been hidden');
			nextChapterLinks[i].classList.add('hidden');
			nextChapterLinks[i].href='';
		} else {
			nextChapterLinks[i].href=targetStory[iNextChapter-1]; //Subtract 1 because array is 0 based
		}
	}
}
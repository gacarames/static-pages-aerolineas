(function () {
	"use strict";

	if (typeof Date.dp_locales === 'undefined') {
		Date.dp_locales = {
		    "texts": {
		        "buttonTitle": "Vyberte datum ...",
		        "buttonLabel": "Klepněte na nebo stiskněte klávesu Enter nebo mezerník otevřete kalendář",
		        "prevButtonLabel": "Přejít na předchozí měsíc",
		        "nextButtonLabel": "Přejít na další měsíc",
		        "closeButtonTitle": "Zavřít",
		        "closeButtonLabel": "Zavřete kalendář",
		        "prevMonthButtonLabel": "Přejít na předchozí rok",
		        "prevYearButtonLabel": "Přejít na dvacetileté",
		        "nextMonthButtonLabel": "Přejít na příští rok",
		        "nextYearButtonLabel": "Přejít na příštích dvaceti letech",
		        "changeMonthButtonLabel": "Klepněte na nebo stiskněte klávesu Enter nebo mezerníku změnit měsíc",
		        "changeYearButtonLabel": "Klepněte na nebo stiskněte klávesu Enter nebo mezerníku změňte rok",
		        "changeRangeButtonLabel": "Klepněte na nebo stiskněte klávesu Enter nebo mezerníku jít do příštích dvaceti letech",
		        "calendarHelp": "- Šipka nahoru a šipka dolů - jde na stejný den v týdnu v předchozí nebo následující týden, resp. Pokud je dosaženo konce měsíce, pokračuje do další nebo předchozí měsíc podle potřeby.\r\n- Šipka vlevo a Šipka vpravo - posune o jeden den na další, rovněž v kontinuu. Vizuálně fokus je přesunut ze dne na den a zábaly z řady do řady v rastru dnů.\r\n- Control + Page Up - Přesun ke stejnému datu předchozího roku.\r\n- Control + Page Down - Přesun ke stejnému datu v příštím roce.\r\n- Home - Přesun na první den aktuálního měsíce.\r\n- End - Přesun na poslední den aktuálního měsíce.\r\n- Page Up - Přesun ke stejnému datu v předchozím měsíci.\r\n- Page Down - Přesun na stejné datum v horizontu jednoho měsíce.\r\n- Enter nebo Espace - zavře kalendář, a vybrané datum je zobrazen v přidružené textového pole.\r\n- Escape - zavře kalendář bez jakékoliv akce."
		    },
		    "directionality": "LTR",
		    "month_names": [
		        "ledna",
		        "února",
		        "března",
		        "dubna",
		        "května",
		        "června",
		        "července",
		        "srpna",
		        "září",
		        "října",
		        "listopadu",
		        "prosince"
		    ],
		    "month_names_abbreviated": [
		        "led",
		        "úno",
		        "bře",
		        "dub",
		        "kvě",
		        "čvn",
		        "čvc",
		        "srp",
		        "zář",
		        "říj",
		        "lis",
		        "pro"
		    ],
		    "month_names_narrow": [
		        "1",
		        "2",
		        "3",
		        "4",
		        "5",
		        "6",
		        "7",
		        "8",
		        "9",
		        "10",
		        "11",
		        "12"
		    ],
		    "day_names": [
		        "neděle",
		        "pondělí",
		        "úterý",
		        "středa",
		        "čtvrtek",
		        "pátek",
		        "sobota"
		    ],
		    "day_names_abbreviated": [
		        "ne",
		        "po",
		        "út",
		        "st",
		        "čt",
		        "pá",
		        "so"
		    ],
		    "day_names_short": [
		        "ne",
		        "po",
		        "út",
		        "st",
		        "čt",
		        "pá",
		        "so"
		    ],
		    "day_names_narrow": [
		        "N",
		        "P",
		        "Ú",
		        "S",
		        "Č",
		        "P",
		        "S"
		    ],
		    "day_periods": {
		        "am": "dopoledne",
		        "noon": "poledne",
		        "pm": "odpoledne"
		    },
		    "day_periods_abbreviated": {
		        "am": "dop.",
		        "noon": "pol.",
		        "pm": "odp."
		    },
		    "day_periods_narrow": {
		        "am": "dop.",
		        "noon": "pol.",
		        "pm": "odp."
		    },
		    "quarter_names": [
		        "1. čtvrtletí",
		        "2. čtvrtletí",
		        "3. čtvrtletí",
		        "4. čtvrtletí"
		    ],
		    "quarter_names_abbreviated": [
		        "Q1",
		        "Q2",
		        "Q3",
		        "Q4"
		    ],
		    "quarter_names_narrow": [
		        "1",
		        "2",
		        "3",
		        "4"
		    ],
		    "era_names": [
		        "př. n. l.",
		        "n. l."
		    ],
		    "era_names_abbreviated": [
		        "př. n. l.",
		        "n. l."
		    ],
		    "era_names_narrow": [
		        "př.n.l.",
		        "n.l."
		    ],
		    "full_format": "EEEE d. MMMM y",
		    "long_format": "d. MMMM y",
		    "medium_format": "d. M. y",
		    "short_format": "dd.MM.yy",
		    "firstday_of_week": 0
		};
	}
})();
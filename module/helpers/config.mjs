export const DSMN = {};

/**
 * The set of Attribute Scores used within the system.
 * @type {Object}
 */
DSMN.attributes = {
	str: 'DSMN.Attribute.Str.long',
	int: 'DSMN.Attribute.Int.long',
	dex: 'DSMN.Attribute.Dex.long',
	wlp: 'DSMN.Attribute.Wlp.long',
	sta: 'DSMN.Attribute.Sta.long',
};

DSMN.attributeAbbreviations = {
	str: 'DSMN.Attribute.Str.abbr',
	int: 'DSMN.Attribute.Int.abbr',
	dex: 'DSMN.Attribute.Dex.abbr',
	wlp: 'DSMN.Attribute.Wlp.abbr',
	sta: 'DSMN.Attribute.Sta.abbr',
};

DSMN.baseSkills = {
	Athletics: {
		label: 'DSMN.Skill.Athletics.long',
		attribute: 'str',
	},
	Academia: {
		label: 'DSMN.Skill.Academia.long',
		attribute: 'int',
	},
	Craftsmanship: {
		label: 'DSMN.Skill.Craftsmanship.long',
		attribute: 'str',
	},
	Intuition: {
		label: 'DSMN.Skill.Intuition.long',
		attribute: 'int',
	},
	Medicine: {
		label: 'DSMN.Skill.Medicine.long',
		attribute: 'int',
	},
	Perceiving: {
		label: 'DSMN.Skill.Perceiving.long',
		attribute: 'int',
	},
	Stealth: {
		label: 'DSMN.Skill.Stealth.long',
		attribute: 'dex',
	},
	Outdoorsmanship: {
		label: 'DSMN.Skill.Outdoorsmanship.long',
		attribute: 'wlp',
	},
};

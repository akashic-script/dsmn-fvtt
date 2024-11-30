import DSMNActorBase from './base-actor.mjs';

export default class DSMNCharacter extends DSMNActorBase {
	static LOCALIZATION_PREFIXES = [...super.LOCALIZATION_PREFIXES, 'DSMN.Actor.Character'];

	static defineSchema() {
		const fields = foundry.data.fields;
		const requiredInteger = { required: true, nullable: false, integer: true };
		const schema = super.defineSchema();

		schema.skills = new fields.SchemaField(
			Object.keys(CONFIG.DSMN.baseSkills).reduce(
				(schemas, key) => {
					schemas[key] = new fields.SchemaField({
						attribute: new fields.StringField({
							required: true,
							nullable: false,
							blank: false,
							choices: Object.keys(CONFIG.DSMN.attributes),
							initial: CONFIG.DSMN.baseSkills[key].attribute || '',
						}),
						value: new fields.NumberField({
							...requiredInteger,
							min: 0,
							max: 30,
							initial: 0,
						}),
						mod: new fields.NumberField({
							...requiredInteger,
							initial: 0,
						}),
					});

					return schemas;
				},
				{}, // Initialize as an empty object
			),
		);

		return schema;
	}

	prepareDerivedData() {
		// Restrict to 8 attributes if the level is 1.
		const maxAttributes = this.level.value === 1 ? 8 : 30;
		const attributeEntries = Object.entries(this.attributes).slice(0, maxAttributes);
		this.attributes = Object.fromEntries(attributeEntries);

		// Update each attribute's mod and calculate total as derived data.
		for (const key in this.attributes) {
			const attribute = this.attributes[key];

			// Ensure `value` does not exceed 8 at level 1.
			if (this.level.value === 1) {
				attribute.value = Math.min(attribute.value, 8);
			}

			// Calculate the total as the sum of value and mod (derived), with a max of 30.
			attribute.total = Math.min(attribute.value + attribute.mod, 30);
			// Handle attribute label localization.
			attribute.label = game.i18n.localize(CONFIG.DSMN.attributes[key]) ?? key;
			attribute.abbr = game.i18n.localize(CONFIG.DSMN.attributeAbbreviations[key]) ?? key;
		}

		// Calculate derived total for each skill
		for (const [skillKey, skill] of Object.entries(this.skills)) {
			const attributeKey = skill.attribute;
			const attributeTotal = this.attributes[attributeKey]?.total ?? 0;
			skill.total = attributeTotal + skill.value + skill.mod;
			// Handle skill label localization.
			skill.label = game.i18n.localize(CONFIG.DSMN.baseSkills[skillKey].label) ?? skillKey;
			console.log("label", skill.label)
		}
	}

	getRollData() {
		const data = {};

		// Copy the attribute scores to the top level, so that rolls can use
		// formulas like `@str.mod + 4`.
		if (this.attributes) {
			for (let [k, v] of Object.entries(this.attributes)) {
				data[k] = foundry.utils.deepClone(v);
			}
		}

		data.lvl = this.level.value;

		return data;
	}
}

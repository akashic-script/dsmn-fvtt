export default class DSMNActorBase extends foundry.abstract.TypeDataModel {
	static LOCALIZATION_PREFIXES = ['DSMN.Actor.base'];

	static defineSchema() {
		const fields = foundry.data.fields;
		const requiredInteger = { required: true, nullable: false, integer: true };
		const schema = {};

		schema.hp = new fields.SchemaField({
			value: new fields.NumberField({ ...requiredInteger, initial: 15, min: 0 }),
			max: new fields.NumberField({ ...requiredInteger, initial: 15 }),
		});
		schema.wp = new fields.SchemaField({
			value: new fields.NumberField({ ...requiredInteger, initial: 15, min: 0 }),
			max: new fields.NumberField({ ...requiredInteger, initial: 15 }),
		});

		schema.description = new fields.HTMLField();

		schema.level = new fields.SchemaField({
			value: new fields.NumberField({ ...requiredInteger, initial: 1 }),
		});

		// Define attributes schema, limiting to a maximum of 30 attributes.
		const attributeKeys = Object.keys(CONFIG.DSMN.attributes).slice(0, 30);
		schema.attributes = new fields.SchemaField(
			attributeKeys.reduce((obj, attribute) => {
				obj[attribute] = new fields.SchemaField({
					value: new fields.NumberField({
						...requiredInteger,
						initial: 3,
						min: 3,
						max: 30,
					}),
					mod: new fields.NumberField({
						...requiredInteger,
						initial: 0,
					}),
				});
				return obj;
			}, {}),
		);

		return schema;
	}

	prepareDerivedData() {
		// Calculator the hp and wp max
		// hp max = attributes.sta.
	}
}

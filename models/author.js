const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {DateTime} = require("luxon");

const AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

AuthorSchema.virtual("name").get(function(){
    let fullname = "";
    if(this.first_name && this.family_name){
        fullname = `${this.first_name}, ${this.family_name}`;
    }

    return fullname;
});

AuthorSchema.virtual('url').get(function(){
    return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("birth_date_formatted").get(function () {
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
  });

AuthorSchema.virtual("death_date_formatted").get(function () {
    return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
  });
AuthorSchema.virtual("birth_date_yyyy_mm_dd").get(function(){
    return DateTime.fromJSDate(this.date_of_birth).toISODate()
})
AuthorSchema.virtual("death_date_yyyy_mm_dd").get(function(){
    return DateTime.fromJSDate(this.date_of_death).toISODate()
})


module.exports = mongoose.model("Author", AuthorSchema);
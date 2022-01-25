function getItemList(form) {
    let json = {};
    json.title  = form.getTitle();
    json.description = form.getDescription();
  
    let list = [];
    let items = form.getItems();
    for(let i=0;i<items.length;i++) {
      let object = {};
      let item = items[i];
  
      object.title = item.getTitle();
      object.helpText = item.getHelpText();
      object.id = item.getId();
      object.type = item.getType();
  
      object.extra = getExtraObject(item,object.type);
  
      list.push(object);
    }
  
    json.items = list;
    return JSON.stringify(json);
  }
  
  /**
   * Returns question data of form item
   * 
   * @param {FormApp.Item} tmpitem Form item to get data
   * @param {FormApp.ItemType} type Type of form item
   * @returns 
   */
  function getExtraObject(tmpitem,type) {
    let extra = {};
    switch(type)
    {
      case FormApp.ItemType.MULTIPLE_CHOICE: {
        let item = tmpitem.asMultipleChoiceItem();
  
        let choices = item.getChoices();
        let choiceList = [];
        for(let i=0;i<choices.length;i++)
        {
          let choice = choices[i];
          let choiceObject = {};
          choiceObject.value = choice.getValue();
  
          choiceList.push(choiceObject);
        }
  
        extra.choices = choiceList;
        extra.hasOtherOption = item.hasOtherOption();
        extra.required = item.isRequired();
  
        break;
      }
      case FormApp.ItemType.CHECKBOX:{
        const item = tmpitem.asCheckboxItem();
        
        let choices = item.getChoices();
        let choiceList = [];
        for(let i=0;i<choices.length;i++)
        {
          let choice = choices[i];
          let choiceObject = {};
          choiceObject.value = choice.getValue();
  
          choiceList.push(choiceObject);
        }
  
        extra.choices = choiceList;
        extra.hasOtherOption = item.hasOtherOption();
        extra.required = item.isRequired();
  
        break;
      }
      case FormApp.ItemType.LIST: {
        const item = tmpitem.asListItem();
  
        let choices = item.getChoices();
        let choiceList = [];
        for(let i=0;i<choices.length;i++)
        {
          let choice = choices[i];
          let choiceObject = {};
          choiceObject.value = choice.getValue();
          
          choiceList.push(choiceObject);
        }
  
        extra.choices = choiceList;
        extra.required = item.isRequired();
  
        break;
      }
      case FormApp.ItemType.TEXT: {
        const item = tmpitem.asTextItem();
        extra.required = item.isRequired();
        break;
      }
      case FormApp.ItemType.PARAGRAPH_TEXT: {
        const item = tmpitem.asParagraphTextItem();
        extra.required = item.isRequired();
        break;
      }
      case FormApp.ItemType.SCALE: {
        const item = tmpitem.asScaleItem();
        extra.leftLabel = item.getLeftLabel();
        extra.rightLabel = item.getRightLabel();
        extra.lowerBound = item.getLowerBound();
        extra.upperBound = item.getUpperBound();
        extra.required = item.isRequired();
        break;
      }
      case FormApp.ItemType.GRID: {
        const item = tmpitem.asGridItem();
        extra.rows = item.getRows();
        extra.columns = item.getColumns();
        extra.required = item.isRequired();
        //@TODO GridValidation
        break;
      }
      case FormApp.ItemType.CHECKBOX_GRID: {
        const item = tmpitem.asCheckboxGridItem();
        extra.rows = item.getRows();
        extra.columns = item.getColumns();
        extra.required = item.isRequired();
        //@TODO CheckboxGridValidation
        break;
      }
      case FormApp.ItemType.DATE: {
        const item = tmpitem.asDateItem();
        extra.includesYear = item.includesYear();
        extra.required = item.isRequired();
        break;
      }
      case FormApp.ItemType.DATETIME: {
        const item = tmpitem.asDateTimeItem();
        extra.includesYear = item.includesYear();
        extra.required = item.isRequired();
        break;
      }
      case FormApp.ItemType.TIME: {
        const item = tmpitem.asTimeItem();
        extra.required = item.isRequired();
        break;
      }
      case FormApp.ItemType.DURATION: {
        const item = tmpitem.asDurationItem();
        extra.required = item.isRequired();
        break;
      }
      case FormApp.ItemType.IMAGE: {
        const item = tmpitem.asImageItem();
        extra.image = Utilities.base64Encode(item.getImage().getBytes());
        extra.imageType = item.getImage().getContentType();
        //extra.width = item.getWidth();
        extra.alignment = item.getAlignment(); // LEFT, CENTER, RIGHT
        break;
      }
      case FormApp.ItemType.SECTION_HEADER:
        break;
      case FormApp.ItemType.VIDEO:
      case FormApp.ItemType.PAGE_BREAK:
        throw new Error(getTranslation('itemlist.workingType', type));
      default:
        throw new Error(getTranslation('itemlist.unknownType', type));
    }
    return extra;
  }
  
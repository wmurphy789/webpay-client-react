// Colors
const mainColor = '#f05757';
const mainFontColor = '#ffffff';
const logo = 'gray';
const transparent = 'rgba(0,0,0,0)';
const contactColor = 'rgba(255,255,255,0.8)';
const border = '#e3e9ef';
const loanColor = '#292929';
const leftCircle = '#3ec556';
const rightCircle = '#ffad00';
const containerBackground = '#f1f5f7';

export default {
  lightBackground: {
    backgroundColor: border
  },
  mainBackgroundColor: {
    backgroundColor: mainFontColor
  },
   contactLogo: {
      backgroundColor: transparent,
      color: logo,
      fontSize: 35
    },
    contact: {
      height: 50,
    },
    contactIcon: {
      backgroundColor: transparent,
      color: contactColor,
      marginRight: 10
    },
    contactText: {
      backgroundColor: transparent,
      color: contactColor
    },
    loginButtonContact: {
      position: 'relative',
      left: -15,
      marginBottom: 35
    },
    loginButtonTextContact: {
      color: mainColor,
      fontSize: 20,
    },

    footer: {
      color: contactColor,
      backgroundColor: 'transparent',
    },
    forgot: {
      color: contactColor,
      backgroundColor: 'transparent',
      textAlign: 'right',
      marginBottom: 20
    },
    logo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: 20,
      paddingTop: 30
    },
    logo1: {
      fontFamily: 'HelveticaNeue-Bold',
      color: contactColor,
      backgroundColor: 'transparent',
      fontSize: 35
    },
    logo2: {
      fontFamily: 'HelveticaNeue-Thin',
      color: contactColor,
      backgroundColor: 'transparent',
      fontWeight: '100',
      fontSize: 35
    },
    loginButton: {
      marginTop: 5,
      backgroundColor: mainColor,
    },
    loginButtonText: {
      fontFamily: 'HelveticaNeue-Thin'
    },
    loginItem: {
      marginLeft: 0,
      borderRadius: 3,
      borderColor: contactColor,
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: 10
    },
    loginInput: {
      color: contactColor,
      fontFamily: 'HelveticaNeue-Thin',
      fontWeight: '100'
    },
    loginInputIconUser: {
      color: contactColor,
    },
    loginInputIconPassword: {
      color: contactColor,
      marginLeft: 2,
      marginRight: 3
    },
    add_button: {
      backgroundColor: mainColor,
      marginBottom: 20,
      height: 60,
      borderRadius: 4,
      elevation: 0,
      marginTop: 50,
      marginLeft: 20,
      marginRight: 20
    },
    add_button_text: {
      color: mainFontColor,
      fontSize: 26,
    },

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: mainFontColor,
        paddingTop: 5,
        paddingBottom: 5,
    },
    separator: {
        backgroundColor: border,
        height: 1
    },
    separator_h: {
        backgroundColor: border,
        width: 1,
        position: 'absolute'
    },
    container_due_title: {
        color: loanColor,
        fontSize: 13,
    },
    container_due_action: {
        marginTop: 14,
    },
    container_due_action_text: {
        color: mainColor,
        fontSize: 20,
    },
    container_progress_title: {
        color: loanColor
    },
    container_progress_chart: {
        marginTop: 26,
        alignItems: 'center',
    },
    container_progress_chart_text: {
        color: logo,
        fontWeight: 'bold'
    },
    container_progress_separator: {
      height: 18,
    },
    container_progress_amount: {
        color: loanColor,
        fontSize: 18,
    },
    container_progress_amount_detail: {
        fontSize: 12,
    },
    container_progress_detail: {
        fontSize: 12,
    },
    dot_gray: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
        backgroundColor: border,
        borderColor: border,
        borderWidth: 2,
        alignSelf: 'center'
    },
    dot_green: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
        backgroundColor: leftCircle,
        alignSelf: 'center',
    },
    dot_orange: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
        backgroundColor: rightCircle,
        alignSelf: 'center',
    },
    container_details: {
        backgroundColor: mainFontColor
    },
    container_details_content: {
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_details_value: {
        fontSize: 18,
        textAlign: 'center',
        color: loanColor,
    },
    container_details_detail: {
        textAlign: 'center',
        marginTop: 5,
        fontSize: 12,
    },
    container_details_action: {
        backgroundColor: transparent,
        borderColor: border,
        borderWidth: 1,
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 2.5,
        right: 2.5
    },
    container_details_action_icon: {
        color: border,
    },
    separator_end: {
        borderRightColor: border,
        borderRightWidth: 2
    },
    separator_start: {
        borderLeftColor: border,
        borderLeftWidth: 2
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    zestimate: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: border,
        borderTopWidth: 2,
        marginTop:  10,
        marginBottom: 10
    },
    zestimate_col: {
        marginTop: 20,
        alignItems: 'center'
    },

    grid: {
      backgroundColor: mainFontColor,
      flex: 1,
      flexDirection: 'column',
      flexGrow: 2
    },
    user: {
      name: { color: loanColor, fontSize: 30 },
      email: { color: loanColor, fontSize: 15 }
    },
    profile_top: {
      paddingTop: 40,
      paddingBottom: 15,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: border
    },
    profileView: {
      backgroundColor: border,
      flex: 1,
      flexGrow: 3,
      padding: 20
    },

    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: 190,
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'relative'
    },
    profilePicture: {
        width: 110,
        height: 110,
        borderRadius: 55
    },
    touchableOpacity: {
      position: 'absolute',
      bottom: -10,
      right: -10,
      backgroundColor: mainColor,
      borderRadius: 22.5,
      width: 45,
      height: 45,
      padding: 0,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputLabel: {
        color: loanColor,
        marginTop: 20,
        marginBottom: 10
    },
    inputLabelWithInfo: {
      position: 'relative'
    },
    showPassword: {
        position: 'absolute',
        right: 2.5,
        top: 2.5,
        padding: 15
    },

    container_item: {
      marginBottom: 40
    },
    date: {
      justifyContent: 'flex-start'
    },
    date__day__month: {
      fontSize: 12,
      color: loanColor,
      borderBottomColor: mainColor,
      borderBottomWidth: 2,
    },
    type_amount:{
      marginTop: 16,
      justifyContent: 'space-around'
    },
    type_amount_amount:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    type_amount_type_text:{
      fontSize: 16,
      color: loanColor
    },
    type_amount_type:{
      marginTop: 4
    },
    divider:{
      height: 2,
      backgroundColor: border,
      marginTop: 5
    },
    action: {
      paddingLeft: 0,
      paddingTop: 0
    },
    action_text: {
      color: mainColor,
    },
    mainContainer: {
      padding: 20,
      backgroundColor: mainFontColor
    },

    item_value_text: {
      alignSelf: 'flex-end',
    },
    item: {
      borderBottomWidth: 1,
      borderBottomColor: border,
      paddingTop: 16,
      paddingBottom: 16,
    },
    label: {
      alignSelf: 'center',
      marginBottom:  10,
      marginTop:  0,
    },
    input: {
      borderWidth: 1,
      borderColor: border,
      paddingLeft: 18,
      paddingTop: 2,
      width: '100%',
      height: 60,
      borderRadius: 4,
      alignItems: 'center',
    },
    item_name: {
      fontSize: 16,
      color: loanColor
    },
    item_value: {
      fontSize: 16,
      alignSelf: 'flex-end',
      color: loanColor
    },
    item_value_missing: {
      fontSize: 16,
      alignSelf: 'flex-end',
      color: mainColor
    },
    button_edit: {
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 0
    },
    button_edit_text: {
      color: mainColor,
      fontSize: 20,
    },
    container__item: {
      margin: 28,
      marginBottom: 20,
    },
    container__details: {
      backgroundColor: containerBackground,
      flex: 1,
      flexGrow: 3,
      paddingLeft: 28,
      paddingRight: 28,
    },
    view: {
      paddingLeft: 30,
      paddingRight: 30,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    account_style: {
      fontSize: 24,
      color: loanColor,
      textAlign: 'right',
      width: '100%',
      paddingRight: 20
    },
    pay_account: {
      fontSize: 12,
      color: mainColor,
      textAlign: 'right',
      width: '100%',
      paddingRight: 20
    },
    labelimg: {
      alignSelf: 'center',
      height: 30,
      resizeMode: 'contain',
    },
    enterBank: {
      color: mainColor,
      fontSize: 16
    },
    picker: {
      borderWidth: 1,
      borderColor: border,
      margin: 0,
      paddingLeft: 18,
      paddingTop: 8,
      width: '100%',
      color: loanColor,
      height: 60,
      borderRadius: 4,
    },
    checkBox: {
      marginTop: 20,
      marginBottom: 10,
      flexDirection: 'row'
    },
    checkBoxLabel: {
      color: loanColor,
      fontSize: 14
    },
    firstCol: {
      marginRight: 20,
      position: 'relative'
    },
    secondCol: {
      position: 'relative'
    },
    item_name_text: {
      color: loanColor,
      fontSize: 26,
    },
    item__value__text: {
      color: loanColor,
      fontSize: 18,
      alignSelf: 'flex-start',
    },
    item_value_last_text: {
      color: loanColor,
      fontSize: 18,
      alignSelf: 'center'
    },
    item_title_text: {
      color: loanColor,
      fontSize: 12,
    },
    item_title_last_text: {
      color: loanColor,
      fontSize: 12,
      alignSelf: 'center'
    },
    no_items_text: {
      color: loanColor,
      fontSize: 18,
      alignSelf: 'center',
      marginTop: 20
    },
    item_col: {
      alignSelf: 'flex-end'
    },
    img_default: {
      height: 22,
      resizeMode: 'contain',
      alignSelf: 'center'
    },
    add_text: {
      color: mainFontColor
    },
    billing_address: {
      color: loanColor,
      marginTop: 20,
      marginBottom: 10,
      fontSize: 24,
      textDecorationLine: 'underline'
    },
    title: {
      color: loanColor,
      marginTop: 20,
      marginBottom: 10,
      fontSize: 18,
    },
    profileLabel: {
      color: loanColor,
      marginTop: 5,
      marginBottom: 5
    },
    passwordItem: {
      marginLeft: 0,
      borderRadius: 3,
      borderColor: contactColor,
      marginBottom: 10
    },
    passwordText: {
      color: logo
    },

    itemStyle: {
      paddingLeft: 5
    },
    pickerStyle: {
      margin: -5,
      width: '100%'
    },
    imageViewStyle: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: '100%',
      backgroundColor: mainFontColor,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageStyle: {
      height: 7,
      width: 50,
      marginTop: 5,
      resizeMode: 'contain'
    },
    inputStyle: {
      borderWidth: 1,
      borderColor: border,
      margin: 0,
      paddingLeft: 18,
      paddingTop: 8,
      width: '100%',
      color: loanColor,
      height: 60,
      borderRadius: 4,
      fontSize: 24
    },
    mainBorderColor: border,
    notificaiton_container_item: {
      marginTop: 20
    },
    notification_date__day__month: {
      fontWeight: 'bold',
      marginLeft: 20
    },
    notification_type_amount_type_text:{
      fontSize: 16,
      color: loanColor,
      marginLeft: 20
    },
    notification_type_amount:{
      marginTop: 8,
      justifyContent: 'space-around'
    },
    logo_notification: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: 20,
      paddingTop: 30,
      marginLeft: 20
    },
  };

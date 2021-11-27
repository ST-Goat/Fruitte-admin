import Text from "pages/common/components/Text";

const NoActivities = ({ i18n }: { i18n: any }) => {
  const translateText = {
    en: "NO ACTIVITIES HAVE BEEN CREATED YET",
    ko: "아직 생성된 체험이 없습니다",
  };
  return (
    <Text className="mt-36 text-center text-4xl text-grey-default">
      {i18n.language === "en" ? translateText.en : translateText.ko}
    </Text>
  );
};

export default NoActivities;
